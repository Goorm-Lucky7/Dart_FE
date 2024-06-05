import { Icon, Text } from '@/components';
import { ButtonBar, CostFilter, KeywordFilter, PostButton } from '..';
import {
  costButtonInfo,
  displayButtonInfo,
  searchButtonInfo,
  sortButtonInfo,
} from '@/consts/filter';
import { filterStore } from '@/stores/filter';

import * as S from './styles';

const Filter = () => {
  const { filterValue, onChange, onNestingChange } = filterStore();

  return (
    <S.Container>
      <S.TitleBox>
        <Text typography="t6" bold="bold">
          FILTER
        </Text>
        <Icon value="filter" $active={false} />
      </S.TitleBox>
      <KeywordFilter
        buttons={searchButtonInfo}
        selected={filterValue.category}
        onChange={onChange}
      />
      <CostFilter
        buttons={costButtonInfo}
        title="비용"
        selected={filterValue.cost}
        onChange={onNestingChange}
      />
      <ButtonBar
        buttons={displayButtonInfo}
        keyPorp="display"
        title="전시상태"
        selected={filterValue.display}
        onChange={onChange}
      />
      <ButtonBar
        buttons={sortButtonInfo}
        keyPorp="sort"
        title="정렬"
        selected={filterValue.sort}
        onChange={onChange}
      />
      <PostButton />
    </S.Container>
  );
};

export default Filter;