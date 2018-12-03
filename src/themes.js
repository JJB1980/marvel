import './styles.scss'

export function initialize (theme) {
  switch (theme) {
  case 'marvel':
    import('../sites/marvel/styles.scss')
    break

  default:
    import('../sites/localhost/styles.scss')
  }
}
