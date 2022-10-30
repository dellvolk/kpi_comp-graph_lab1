import React, {Suspense} from 'react';
import styled from 'styled-components';
// import Menu from './components/Menu';
import './styles/bootstrap.css'
import './styles/global.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const Menu = React.lazy(() => import('./components/Menu'));

class App extends React.Component {
    // width={1500} height={900}


    render() {
        return (
            <StyledApp className="">
                <div className="stage">
                    <div>
                        <canvas id="stage"/>
                    </div>
                </div>
                <Suspense>
                    <Menu

                    />
                </Suspense>
            </StyledApp>
        )
    }
}

const StyledApp = styled.div`
  display: flex;
  height: 100vh;

  .stage {
    padding: 10px;
    max-width: calc(100% - 350px);
    flex: 1;

    & > div {
      max-height: 100%;
      max-width: 100%;
      overflow: auto;
      border: 1px solid #ccc;

      & > canvas {
        background-color: #fff;
      }
    }
  }
`

export default App;
