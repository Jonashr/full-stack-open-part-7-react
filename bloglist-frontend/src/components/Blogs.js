import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TableContainer, Table, Paper, TableBody, TableRow, TableCell } from '@material-ui/core'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return(
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}



export default Blogs