import lodash from '@/utils/lodash';
import dayjs from 'dayjs';
import { ListPage, ListPageWithSameRules } from './listPages';

export const hasPermission = (pathName: string, userInfo: any): boolean => {
  const componentRule =
    ListPage[pathName] || ListPageWithSameRules.find((item) => item.alias.includes(pathName))?.matchingRule;

  if (!userInfo) return false;
  if (!componentRule) return true;

  const { operator, rules } = componentRule;

  if (operator === 'OR') {
    const ruleKeys = lodash.keys(rules);
    return ruleKeys.some((key) => {
      if (rules[key].length === 0) return true;
      return rules[key].includes(userInfo[key]);
    });
  }

  if (operator === 'AND') {
    return rules.some((rule) => {
      const ruleKeys = lodash.keys(rule);
      return ruleKeys.every((key) => {
        if (rule[key].length === 0) return true;
        return rule[key].includes(userInfo[key]);
      });
    });
  }
};

export const getOptionFromObj = (obj) => {
  return lodash.map(obj, (val: string, key: string) => ({
    label: val,
    value: key,
  }));
};

export function convertToOptions(
  collection: any[],
  value: string,
  label: string
): { value: number; label: string }[] {
  return lodash.reduce(
    collection,
    (total, item) => {
      if (!lodash.isNil(item)) {
        const option = {
          value: item?.[value],
          label: item?.[label],
        };
        return [...total, option];
      }
      return total;
    },
    []
  );
}

export function searchValueOptions(input: any, option: any) {
  return option?.label?.toString()?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export const formatTime = (date, format = 'YYYY/MM/DD') => {
  if (!date) return undefined;
  return dayjs(date).format(format);
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const uid = (len) => {
  const buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length;
  for (let i = 0; i < len; ++i) buf.push(chars[getRandomInt(0, charlen - 1)]);
  return buf.join('');
};

export const toVND = (val: number) => {
  return val ? val.toLocaleString() : '';
};

export const mergeOptions = (defaultOptions = [], newOptions = []) => {
  let optionAll = [...defaultOptions, ...newOptions];
  optionAll = optionAll?.reduce((total, option) => {
    // Có phần tử đã có trong list nên bỏ qua
    if (total.some(({ value }) => option.value === value)) {
      return total;
    }
    return [...total, option];
  }, []);
  return optionAll;
};

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};
