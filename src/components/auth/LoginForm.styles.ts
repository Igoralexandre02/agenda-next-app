import styled, { keyframes } from 'styled-components';

//#region Tela de login

export const Container = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #f5f5f5;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 40px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  color: #171717;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #737373;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #404040;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  box-sizing: border-box;

  color: #000000;

  &:focus {
    border-color: #171717;
  }

  &::placeholder {
    color: #a3a3a3;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 8px;
  background: #171717;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: #dc2626;
  text-align: center;
`;

//#endregion

//#region Vefiricação de login

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #f5f5f5;
`;

export const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border: 4px solid #e5e5e5;
  border-top-color: #171717;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const LoadingText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #737373;
`;

//#endregion