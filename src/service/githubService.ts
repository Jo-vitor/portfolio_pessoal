export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  pushedAt: string;
  fork: boolean;
  archived: boolean;
}

export class GitHubError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

const token = import.meta.env.VITE_GITHUB_TOKEN;

async function request(resource: string, username: string) {        

  const promise = (async () => {
    let response;
    try {
      const params = new URLSearchParams({ resource, username });
      response = await fetch(`https://api.github.com/user/${resource}`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
      );
      
    } catch {
      throw new GitHubError("network", "Sem conexão com o servidor.");
    }

    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new GitHubError(
        "no_api",
        "A rota /api/github não existe aqui. Rode com npm run dev ou publique na Vercel."
      );
    }

    const body = await response.json();
    
    if (!response.ok) {
      throw new GitHubError(body.error ?? "error", body.message ?? `HTTP ${response.status}`);
    }
    return body;
  })();

  return promise;
}
  
export const fetchRepos = (username: string) => request("repos", username);