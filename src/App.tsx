import { useId, useRef, useState } from 'react';
import './App.css'

type Color = string
type ParamTypes = string | number | string[] | number[]
interface IParam {
  id: string;
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

const ModelCard:React.FC<Props> = ({params, model}) => {
  const id = useId()
  const [newParameter, setNewParametr] = useState<IParam>()
  return (
    <div>
      <form action="">
        <label htmlFor=""></label>
        <input type="text" />
      </form>
      <div>
        <>
          <h6>{model.paramValues}</h6>
          <p></p>
        </>
      </div>
    </div>
  )
}

class Parameter implements IParam {
  id: string
  name: string
  readonly type: string
  constructor(id: string, name: string) {
    this.id = id,
    this.name = name,
    this.type = 'string'
  }
}
const CreateNewParam:React.FC = ()=> {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const initialParams: IParam[] = [{
    id: id,
    name: 'Назначение',
    type: 'string'
  },
  {
    id: id,
    name: 'Длина',
    type: 'string'
  }]
 
  const [param, setParam] = useState<IParam[]>(initialParams)

  function handleAddParam() {
    const value = inputRef.current?.value
    if (value) {
      const param = new Parameter(id, value)
      setParam(prev => [...prev, param])
    }
    
  }
  return (
    <form onSubmit={handleAddParam}>
      <label htmlFor="paramValue">Новый параметр</label>
      <input ref={inputRef} name='paramValue' type="text" />
      <button>Сохранить</button>
    </form>
  )
}

function App() {
  const id = useId()
  const initialParams: IParam[] = [{
    id: id,
    name: 'Назначение',
    type: 'string'
  },
  {
    id: id,
    name: 'Длина',
    type: 'string'
  }]

  const [parameters, setParameters] = useState<IParam[]>(initialParams)
  const [model, setModel] = useState<Model>(
    {
      paramValues: [{
        paramId: 1,
        value: 'повседневное'
      },{
        paramId: 2,
        value: 'макси'
      }],
      colors: ['blue', 'red']
    }
  )

  return (
    <>
      <ModelCard params={parameters} model={model} />
    </>
  )
}

export default App

// class Parameter implements IParam{
//   id: number;
//   name: string;
//   type: 'string';
//   constructor(id: number, name: string, type: ParamTypes) {
//     this.id = id,
//     this.name = name
//     this.type = type
//   }
//   getParamValue(){
//     return
//   }
// }