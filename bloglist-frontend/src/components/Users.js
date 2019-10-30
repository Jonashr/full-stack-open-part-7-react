import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Users = (props) => {
  console.log('Users', props)
  if(props.users.users === undefined) {
    return null
  }

  return(
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
          {props.users.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)