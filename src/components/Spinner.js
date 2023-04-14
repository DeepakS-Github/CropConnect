import React, { PureComponent } from 'react'
import loading from './loading.gif'

export default class Spinner extends PureComponent {
  render() {
    return (
        <div className="text-center">
            <img src={loading}  className="w-6 mx-1" alt="loading" srcset="" />
        </div>
    )
  }
}
