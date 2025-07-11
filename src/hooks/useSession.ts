import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useSessionStore } from "../stores/useSessionStore"; 
import { SessionService } from "../services/sessionService"; 
import { httpCLient } from "../adapters/httpClient";
import { Credentials } from "types/profiles";

const sessionService = new SessionService(httpCLient);

export function useSession() {
  const navigate = useNavigate();
  const { setState, reset } = useSessionStore();

  const loginMutation = useMutation({
    mutationFn: async (data: Credentials) =>
      sessionService.start(data),
    onSuccess: (response) => {
      setState({ accessToken: response.token });
      navigate("/");
    },
    onError: () => {
      console.error("Erro ao autenticar. Verifique suas credenciais.");
    },
  });

  function logout() {
    reset(); // Remove o token do Zustand
    navigate("/")
  }

  return {
    login: loginMutation.mutate,
    loading: loginMutation.isPending,
    error: loginMutation.error,
    logout,
  };
}
