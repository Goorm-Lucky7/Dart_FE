import { alertStore } from '@/stores/modal';
import { Button, Dimmed, Icon, Text } from '..';

import * as S from './styles';

interface AlertProps {
  open: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  buttonLabel?: string;
  onClickButton?: () => void;
}

const Alert = ({
  open,
  title,
  description,
  buttonLabel = '확인',
  onClickButton,
}: AlertProps) => {
  const close = alertStore((state) => state.close);

  if (!open) return;

  return (
    <Dimmed style={{ zIndex: 12 }}>
      <S.Container>
        <S.HeaderBox>
          <Text typography="t4">{title}</Text>
          <Icon value="cancel" size={15} onClick={close} />
        </S.HeaderBox>
        {typeof description === 'string' ? (
          <Text typography="t5" bold="regular" className='dsBox'>
            {description}
          </Text>
        ) : (
          <>{description}</>
        )}

        <Button bold="bold" size="smMd" onClick={onClickButton}>
          {buttonLabel}
        </Button>
      </S.Container>
    </Dimmed>
  );
};

export default Alert;
