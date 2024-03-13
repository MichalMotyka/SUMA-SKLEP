import { Link } from 'react-router-dom'

function NotFound () {
  return (
    <p style={{ textAlign: 'center', marginTop: '20px' }}>
      Taka strona nie istnieje, wróć na{' '}
      <Link to='/' style={{ fontWeight: 'bold', color: 'black' }}>
        stronę główną.{' '}
      </Link>
    </p>
  )
}

export default NotFound
