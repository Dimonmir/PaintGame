import { ExportOutlined } from '@ant-design/icons';
import { Avatar, Button, Typography } from 'antd';
import { Container } from './s-header';
import { ContainerFlex } from '@s-app';
import { removeToken } from '@/entities/session/sessionSlice';
import { authLogout, useAppDispatch, useAppSelector } from '@shared';
import { Message } from '@features/Message';
import { selectorSession } from '@entities/session';
import { app, database } from '@main';
import { remove, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function Header() {
  const auth = getAuth(app);
  const name = useAppSelector((state) => state.user.name);
  const session = useAppSelector(selectorSession);
  const dispatch = useAppDispatch();
  const handlerLogout = () => {
    if (session.roomId && session.playerId) {
      if (session.host) {
        remove(ref(database, 'game/' + session.roomId + '/players/' + session.playerId)).then(
          () => {
            remove(ref(database, 'game/' + session.roomId)).then(() => {
              authLogout().finally(() => {
                dispatch(removeToken());
              });
            });
          }
        );
      } else {
        remove(ref(database, 'game/' + session.roomId + '/players/' + session.playerId)).then(
          () => {
            authLogout().finally(() => {
              dispatch(removeToken());
            });
          }
        );
      }
    } else {
      authLogout().finally(() => {
        dispatch(removeToken());
      });
    }
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
