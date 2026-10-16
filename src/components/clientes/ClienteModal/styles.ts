import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FormError = styled.p`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.dangerText};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};

  & > * {
    flex: 1;
  }
`;
