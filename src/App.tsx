import './App.css'
import React from 'react';

type Color = string
interface IParam {
  id: number;
  name: string;
  readonly type: string;
}
interface ParamValue {
   paramId: number;
   value: string;
}
interface Model {
   paramValues: ParamValue[];
   colors: Color[];
}
interface Props {
   params: IParam[];
   model: Model;
}
interface State {
  model: Model;
}
class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
      super(props);
      this.state = {
          model: props.model,
      };
  }

  getModel() {
      return this.state.model; 
  }

  handleInputChange(paramId: number, value: string) {
      this.setState(prevState => {
          const paramValues = prevState.model.paramValues.map(pv => 
              pv.paramId === paramId ? {...pv, value} : pv
          );
          return {
              model: {
                  ...prevState.model,
                  paramValues,
              }
          };
      });
  }

  render() {
      return (
          <div>
              {this.props.params.map(param => (
                  <div key={param.id}>
                      <label>{param.name}</label>
                      <input
                          value={this.state.model.paramValues.find(pv => pv.paramId === param.id)?.value || ''}
                          onChange={e => this.handleInputChange(param.id, e.target.value)}
                      />
                  </div>
              ))}
          </div>
      );
  }
}

function getParams() {
  const initialParams: IParam[] = [{
    id: 1,
    name: 'Назначение',
    type: 'string'
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string'
  }]
  return initialParams
}


function App() {
  const param = getParams()
  const model= {
    paramValues: [{
      paramId: 1,
      value: 'повседневное'
    },{
      paramId: 2,
      value: 'макси'
    }],
    colors: ['blue', 'red']
  }

  return (
    <>
      <ParamEditor params={param} model={model}/>
    </>
  )
}

export default App
