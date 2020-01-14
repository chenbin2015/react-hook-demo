import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
  useRef
} from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0)
  const [tt, ff] = useState({
    aa: 2
  })

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/context'>context</Link>
          </li>
          <li>
            <Link to='/useLayoutEffectDemo'>useLayoutEffectDemo</Link>
          </li>
          <li>
            <Link to='/useReducerDemo'>useReducerDemo</Link>
          </li>
          <li>
            <Link to='/useRefDemo'>useRefDemo</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/context'>
            <ContextDemo />
          </Route>
          <Route path='/useLayoutEffectDemo'>
            <LayoutEffectDemo />
          </Route>
          <Route path='/useReducerDemo'>
            <UseReducerDemo />
          </Route>
          <Route path='/useRefDemo'>
            <UseRefDemo />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

// You can think of these components as "pages"
// in your app.

function Home() {
  const [count, setCount] = useState(0)
  // const test = false
  // if (test) {
  const [age, setAge] = useState(20)
  // }
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`
    return () => {
      console.log('unmount')
    }
  }, [age])

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1)
    }, 50)
    return () => {
      clearInterval(timer)
    }
  })
  return (
    <div>
      <h2>Home{count}</h2>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        add
      </button>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

const CountContext = createContext(0)
function ContextDemo() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <CountContext.Provider value={count}>
        <Child />
      </CountContext.Provider>
    </div>
  )
}

function Child() {
  const count = useContext(CountContext)
  return <h2>子组件：{count}</h2>
}

function LayoutEffectDemo() {
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const title = document.querySelector('#title')
    const titleWidth = title.getBoundingClientRect().width
    if (width !== titleWidth) {
      setWidth(titleWidth)
    }
  })
  return (
    <div>
      <h1 id='title'>hello</h1>
      <h2>页面宽度：{width}</h2>
    </div>
  )
}

const initState = {
  count: 0
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return initState
    default:
      return state
  }
}

function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
    </div>
  )
}

function UseRefDemo() {
  const inputRef = useRef(null)

  return (
    <div>
      <input type='text' ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>focus</button>
    </div>
  )
}

export default App
