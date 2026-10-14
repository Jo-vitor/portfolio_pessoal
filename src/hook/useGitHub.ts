import { useEffect, useState } from "react";
import GITHUB_CONFIG from "../config/githubConfig";
import { type GitHubRepo } from "../service/githubService";

export default function useGitHub(fetcher: (username: string) => Promise<GitHubRepo[]>, username: string) {
  const [state, setState] = useState<{
    status: "loading" | "ready" | "error";
    data: GitHubRepo[] | null;
    error: unknown | null;
  }>({ status: "loading", data: null, error: null });

  useEffect(() => {
    if (!username) return;
    let active = true;
    setState({ status: "loading", data: null, error: null });

    fetcher(username)
      .then((data) => active && setState({ status: "ready", data, error: null }))
      .catch((error) => active && setState({ status: "error", data: null, error }));

    return () => {
      active = false;
    };
  }, [fetcher, username]);  

  return state;
}

export const visibleRepos = (
  repos: GitHubRepo[]
) =>
  repos.filter(
    (repo) =>
      !(GITHUB_CONFIG.HIDE_FORKS && repo.fork) &&
      !(GITHUB_CONFIG.HIDE_ARCHIVED && repo.archived)
  );