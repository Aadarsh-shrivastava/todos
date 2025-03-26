import { Sidebar } from '../../components/sidebar/Sidebar'
import { TaskListArea } from '../../components/taskListArea/TaskListArea'
import './HomePage.css'

export function HomePage() {
  return (
    <div className='HomePage'>
      <Sidebar/>
      <TaskListArea/>
    </div>
  )
}