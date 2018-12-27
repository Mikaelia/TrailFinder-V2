export const FILTERS = {
  MAXLENGTH: (trails, maxLength) =>
    trails.filter(trail => trail.length <= maxLength)
};
