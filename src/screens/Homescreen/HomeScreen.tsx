import Sidebar from '../../components/sidebar/Sidebar'
import TaskListArea from '../../components/taskListArea/TaskListArea'
import './HomeScreen.css'

function HomeScreen() {
  return (
    <div className='homescreen'>
      <Sidebar/>
      <TaskListArea/>
    </div>
  )
}

export default HomeScreen