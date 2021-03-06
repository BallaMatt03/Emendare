import React from 'react'
import { Hero, Link, Page } from '../../../components'
import { Socket } from '../../../services'

interface IContributorsPageState {
  contributors: any[]
}

export class ContributorsPage extends React.Component<
  {},
  IContributorsPageState
> {
  constructor(props: {}) {
    super(props)

    this.state = {
      contributors: []
    }
  }

  public async componentDidMount() {
    const contributors = ((await Socket.fetch(
      'contributors'
    )) as any[]).reverse()
    this.setState({ contributors })
  }

  public componentWillUnmount() {
    Socket.off('contributors')
  }

  public render() {
    return (
      <Page title="Contributeurs">
        <Hero
          title="Remerciements à tous les contributeurs"
          subtitle="Pour contribuer à la plateforme rendez-vous sur le Github d'Emendare"
        />
        {this.state.contributors.length > 1 && (
          <div>
            Merci à{' '}
            {this.state.contributors.map((contributor, index, arr) => (
              <span key={contributor.author.path}>
                <Link to={'https://github.com' + contributor.author.path}>
                  {contributor.author.login}
                </Link>
                {index < arr.length - 1 && <span>{', '}</span>}
              </span>
            ))}
          </div>
        )}
      </Page>
    )
  }
}
