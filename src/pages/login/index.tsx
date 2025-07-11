import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Credentials } from "types/profiles";
import { useSession } from "../../hooks/useSession";
import { StyledContainer, StyledContainerForm, StyledContainerHeader, StyledInput } from "../../styles/container";
import { StyledButton } from "../../styles/button";
import { StyledAlert, StyledAlertContaienr } from "../../styles/error_message";
import { Spinner } from "../../styles/spinner";

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<Credentials>();
  const { login, loading, error } = useSession();
  const onSubmit: SubmitHandler<Credentials> = (credentials) => login(credentials)

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <>
        <p>Erro inesperado aconteceu! Verifique suas credenciais!</p>
        <a onClick={() => window.location.href = "/"}>Voltar</a>
      </>
    );
  }

  return (
    <StyledContainer>
      <StyledContainerHeader>
        <h1>Faça Login!</h1>
      </StyledContainerHeader>
      <StyledContainerForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <StyledInput
            $hasError={errors.email ? true : false}
            id="email"
            type="email"
            {...register("email", {
              required: "⚠️ Email é Obrigatório!",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "⚠️ Formato de email inválido!",
              },
            })}
          />
        </div>
        <StyledAlertContaienr>
          {errors.email && <StyledAlert>{errors.email.message}</StyledAlert>}
        </StyledAlertContaienr>
        <div>
          <label htmlFor="password">Senha:</label>
          <StyledInput
            $hasError={errors.password ? true : false}
            id="password"
            type="password"
            {...register("password", { required: "⚠️ Senha é Obrigatória!" })}
          />
        </div>
        <StyledAlertContaienr>
          {errors.password && <StyledAlert>{errors.password.message}</StyledAlert>}
        </StyledAlertContaienr>

        <StyledButton type="submit">Login</StyledButton>
        <Link to={"/register"}>Não tem conta??</Link>
      </StyledContainerForm>
    </StyledContainer>
  );
}
