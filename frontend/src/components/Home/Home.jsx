import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, Button, TextField } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPostBySearch } from '../../actions/posts';
import Paginate from '../Pagination/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId ] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles()

    const searchPost = () => {
      if(search.trim() || tags) {
        dispatch(getPostBySearch({ search, tags: tags.join(',')}))
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      } else {
        history.push('/')
      }
    }

    const handleKeyPress = (e) => {
      if(e.charCode === 13) {
        searchPost();
      }
    }

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))



  return (
    <Grow in>
        <Container maxWidth='xl'>
          <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField name='search' variant='outlined' label='Search Memories' fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
                <ChipInput 
                  style={{margin: '10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant='outlined'
                />
                <Button className={classes.searchButton} onClick={searchPost} variant='contained' color='primary'>Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && !tags.length) && (
                <Paper elevation={6} className={classes.pagination}>
                  <Paginate page={page}/>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home