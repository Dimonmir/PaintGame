import { ExportOutlined } from '@ant-design/icons';
import { Avatar, Button, Typography } from 'antd';
import { Container } from './s-header';
import { ContainerFlex } from '@s-app';
import { removeToken } from '@/entities/session/sessionSlice';
import { authLogout, useAppDispatch, useAppSelector } from '@shared';
import { Message } from '@features/Message';

export default function Header() {
  const name = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();
  const handlerLogout = () => {
    authLogout().finally(() => {
      dispatch(removeToken());
    });
  };

  return (
    <Container>
      <Message />
      <Avatar size={40} icon={<img src={'/myLogo.jpg'} alt="avatar" />} />
      <Typography.Title level={5} className="headerText">
        version 0.5
      </Typography.Title>
      <ContainerFlex>
        <Typography.Title level={2} className="headerText">
          {name}
        </Typography.Title>
        <Button
          className="headerText"
          type="text"
          shape="circle"
          size={'large'}
          icon={<ExportOutlined style={{ fontSize: '20px' }} />}
          onClick={handlerLogout}
        />
      </ContainerFlex>
    </Container>
  );
}
