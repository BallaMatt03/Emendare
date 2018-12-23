import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts'
import { Spacer } from '../components'
import { apiFetch } from '../utils'

const unFollowGroup = setUser => id => () => {
  apiFetch('/user/unFollowGroup/' + id, {
    method: 'post',
    body: JSON.stringify({
      token: localStorage.getItem('user-token')
    })
  }).then(async res => {
    if (res.status === 200) {
      const user = await res.json()
      setUser(user)
    }
  })
}

const followGroup = setUser => id => () => {
  apiFetch('/user/followGroup/' + id, {
    method: 'post',
    body: JSON.stringify({
      token: localStorage.getItem('user-token')
    })
  }).then(async res => {
    if (res.status === 200) {
      const user = await res.json()
      setUser(user)
    }
  })
}

export const Group = ({ data }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user, setUser }) => (
        <>
          <div className="buttons">
            {data.parent && (
              <Link to={'/group/' + data.parent._id} className="button">
                <span className="icon">
                  <i className="fas fa-chevron-left" />
                </span>
                <span>Retour au groupe parent</span>
              </Link>
            )}

            <Spacer />

            {isConnected() && (
              <Link to={'/text/' + data.rules._id} className="button is-info">
                <span className="icon">
                  <i className="fas fa-cog" />
                </span>
                <span>Voir les règles du groupe</span>
              </Link>
            )}

            {isConnected() &&
              (user.followedGroups.find(id => id === data._id) ? (
                <button
                  onClick={unFollowGroup(setUser)(data._id)}
                  className="button is-danger is-outlined"
                >
                  Ne plus suivre ce groupe
                </button>
              ) : (
                <button
                  onClick={followGroup(setUser)(data._id)}
                  className="button is-success"
                >
                  Suivre ce groupe
                </button>
              ))}
          </div>

          <div className="box">
            <p>Description : {data.description}</p>
            <p>Crée le : {new Date(data.created).toLocaleString()}</p>
          </div>

          {data.subgroups.length > 0 && (
            <>
              <p>Groupes</p>
              {data.subgroups.map(subgroup => (
                <Link key={subgroup._id} to={'/group/' + subgroup._id}>
                  {subgroup.name} : {subgroup.description}
                </Link>
              ))}
            </>
          )}

          {data.texts.length > 0 && (
            <>
              <p>Textes</p>
              <ul>
                {data.texts.map(text => (
                  <li key={text._id}>
                    <Link to={'/text/' + text._id}>
                      {text.name} : {text.description}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </UserContext.Consumer>
  )
}