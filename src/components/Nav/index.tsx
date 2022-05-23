import { Link, useLocation } from 'react-router-dom';
import { NavItem, NavStyle } from './styles';

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <>
      <NavStyle>
        <NavItem selected={pathname === '/'}>
          <Link to='/'>전체</Link>
        </NavItem>
        <NavItem selected={pathname === '/completed'}>
          <Link to='/completed'>완료목록</Link>
        </NavItem>
        <NavItem selected={pathname === '/created'}>
          <Link to='/created'>생성순</Link>
        </NavItem>
        <NavItem selected={pathname === '/deadline'}>
          <Link to='/deadline'>마감순</Link>
        </NavItem>
      </NavStyle>
    </>
  );
};

export default Nav;
