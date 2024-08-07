import { TeamUserData } from '@/consts/teamUser';
import * as S from './styles';
import Masonry from 'react-masonry-css';
import Footer from '@/components/footer';
import { Text } from '@/components';

const breakpointColumnsObj = {
    default: 2,
    1024: 1,
    500: 1,
};

const ContactPage = () => {
    return (
      <S.Container>
          <S.TopBox>
              <S.TeamText typography='t0' bold='semibold' className='mainText'>LuckySeven</S.TeamText>
              <S.TeamText typography='t3' bold='medium' color='black' className='subText'>
                  서비스 런칭까지의 여정을
                  <br/>
                  다재다능한 동료들과 함께 나아갔습니다
              </S.TeamText>
          </S.TopBox>
          <S.BottomBox>
              <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
              >
              {TeamUserData.map((user, index) => (
                  <S.Member key={index}>
                        <S.LinkBox to={user.github}>
                            <S.MemberImage src={user.image} alt={user.name} />
                            <S.ContentBox>
                                <Text typography='t5' color='white' bold='semibold'>{user.github}</Text>
                                <Text typography='t5' color='white' bold='semibold' className="description">{user.mail}</Text>
                            </S.ContentBox>
                        </S.LinkBox>
                        <S.MemberDescription typography='t4' bold='semibold'>{user.description}</S.MemberDescription>
                        <S.MemberInfo>
                            <S.MemberTeam typography='t6' bold='medium' color='gray500'>{user.team}</S.MemberTeam>
                            <div className='wall1'></div>
                            <S.MemberRole typography="t6" bold="medium" color='gray500'>{user.role}</S.MemberRole>
                            <div className='wall2'></div>
                          <S.MemberName typography="t6" bold="regular" color='gray500'>{user.name}</S.MemberName>
                        </S.MemberInfo>
                  </S.Member>
              ))}
              </Masonry>
          </S.BottomBox>
          <Footer />
      </S.Container>
    )
  }
  
  export default ContactPage;