/**
 * 값이 비어 있는지 확인한다.
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
 *
 * @param obj - obj
 * @returns {boolean} - obj가 비어 있으면 true를 반환하고, 그렇지 않으면 false를 반환한다.
 */
export const isEmpty = (obj: any) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};
