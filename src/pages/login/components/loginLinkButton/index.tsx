import { Button, Icon } from '@/components';
import { alertStore } from '@/stores/modal';
import useCustomNavigate from '@/hooks/useCustomNavigate';

import * as S from './styles';

interface LoginLinkButtonProps {
  title: string;
  path: string;
  buttonLabel: string;
}

const LoginLinkButton = ({ title, buttonLabel, path }: LoginLinkButtonProps) => {
  const navigate = useCustomNavigate();
  const open = alertStore((state) => state.open);

  return (
    <S.Container>
      <S.Description typography="t6" color="white" bold="thin">
        {title}
      </S.Description>
      <Button
        leftContent={<Icon value="halfArrow" $rotate $active={false} />}
        children={buttonLabel}
        buttonType="onlyText"
        size="fit"
        type="button"
        onClick={
          path
            ? () => navigate(path)
            : () =>
                open({
                  title: '에러',
                  buttonLabel: '확인',
                  description: '구현 예정입니다',
                })
        }
      />
    </S.Container>
  );
};

export default LoginLinkButton;
