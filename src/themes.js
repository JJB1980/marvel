import './styles.scss'

export function initialize (theme) {
  switch (theme) {
  case 'marvel':
    require('../sites/marvel/styles.scss')
    break

  default:
    require('../sites/localhost/styles.scss')
  }
}
