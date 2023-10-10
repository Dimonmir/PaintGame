import styled from 'styled-components';

export const GameForm = styled.div`
  background-color: #ffffff;
  width: 80%;
  height: 80vh;
  display: flex;
  border-radius: 10px;
  margin: 50px auto 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}px) {
    margin: 20px auto 0;
  }

  .gameConteiner {
    display: flex;
    flex: 1 1 80%;
    flex-direction: column;
    position: relative;
    border-right: 1px solid ${({ theme }) => theme.colors.lightGray};
  }

  .title {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    flex: 0 0 10%;
    align-content: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.black};
    font-size: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};

    .exit {
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 20px;
      color: #e23e3e;
      transition: color, background-color 0.3s ease-in-out;
    }
    .exit:hover {
      color: #fd0000;
      background-color: #fcdbdb;
    }
  }

  .wrapButtonStart {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .buttonStart {
    z-index: 2;
    min-width: 300px;
    min-height: 60px;
    font-family: 'Nunito', sans-serif;
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: 1.3px;
    font-weight: 700;
    color: white;
    background: #dc9754;
    background: linear-gradient(90deg, rgba(220, 151, 84, 0.64) 0%, rgba(252, 176, 101, 0.64) 100%);
    border: none;
    border-radius: 1000px;
    box-shadow: 6px 6px 12px rgba(122, 85, 48, 0.64);
    transition: all 0.3s ease-in-out 0s;
    cursor: pointer;
    outline: none;
    position: relative;
    padding: 10px;
  }

  .buttonStart::before {
    content: '';
    border-radius: 1000px;
    min-width: calc(300px + 12px);
    min-height: calc(60px + 12px);
    border: 6px solid #dc9754;
    box-shadow: 0 0 60px rgba(252, 176, 101, 0.64);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease-in-out 0s;
  }

  .buttonStart:hover,
  .buttonStart:focus {
    transform: translateY(-6px);
  }

  .buttonStart:hover::before,
  .buttonStart:focus::before {
    opacity: 1;
  }

  .buttonStart::after {
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 6px solid #ce7e00;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ring 1.5s infinite;
  }

  .buttonStart:hover::after,
  .buttonStart:focus::after {
    animation: none;
    display: none;
  }

  @keyframes ring {
    0% {
      width: 30px;
      height: 30px;
      opacity: 1;
    }
    100% {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }

  .waitContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .waitImg {
    width: 100px;
    height: 180px;
    background-image: url('/waitImg.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
