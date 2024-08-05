export const PUBLIC_PATHS = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up'
};

export const PRIVATE_PATHS = {
  MAIN: '/',
  ARCHIVE: '/archive',
  SETTINGS: '/settings',
  CATEGORIES: '/categories',

};

export const COMMON_PATHS = {
  NOT_FOUND: '/not-found',
  INTERNAL_ERROR: '/internal-error'
}

export const ALL_PATH = {...COMMON_PATHS, ...PRIVATE_PATHS, ...PUBLIC_PATHS}
