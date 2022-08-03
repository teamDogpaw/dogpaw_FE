import styled from 'styled-components';
import { ReactComponent as EmptyPageImg } from '../styles/images/emptyPage.svg';
import { EmptyBody } from './common/ApplyList';

const EmptyPage = ({ message }) => {
  return (
    <EmptyBody>
      <EmptyImg />
      <span>{message}</span>
    </EmptyBody>
  );
};

const EmptyImg = styled(EmptyPageImg)`
  margin-top: 30px;
  height: 250px;
`;

export default EmptyPage;
