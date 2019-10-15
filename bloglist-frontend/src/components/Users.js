import React from 'react'
import {
  Link
} from 'react-router-dom'

const Users = ({ users }) => {
  console.log('Users', users)
  return(
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users