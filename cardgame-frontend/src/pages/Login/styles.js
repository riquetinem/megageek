import styled from 'styled-components';


export const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

export const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

export const LogoImage = styled.img`
  width: 180px;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  position: relative;
  text-align: left;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: #f8fafc;
  
  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.2);
    background-color: white;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 38px;
  background: none;
  border: none;
  cursor: pointer;
  color: #718096;
  padding: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: #4e73df;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
  background-color: #4e73df;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #3a5bbf;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const FooterText = styled.p`
  margin-top: 1.5rem;
  color: #718096;
  font-size: 0.9rem;

  a {
    color: #4e73df;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;