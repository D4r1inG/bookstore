interface ListPageProps {
  [pathName: string]: MatchingRule;
}

interface ListPageWithSameRulesProps {
  alias: string[];
  matchingRule: MatchingRule;
}

type MatchingRule =
  | {
      operator: 'AND';
      rules: Rule[];
    }
  | {
      operator: 'OR';
      rules: Rule;
    };

export interface Rule {
  group_id?: number[];
  position_job?: number[];
  username?: string[];
}

export const ListPageWithSameRules: ListPageWithSameRulesProps[] = [
  // Format phân quyền component có những rule giống nhau
];

export const ListPage: ListPageProps = {};
