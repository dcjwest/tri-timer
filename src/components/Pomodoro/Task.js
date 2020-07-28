import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IconContext } from 'react-icons';
import { MdArrowBack, MdCheck } from 'react-icons/md';

const Task = (props) => {
    const {
        showTaskPage,
        addNewTask,
        closeTaskPage,
        taskName,
        numOfPomodoros,
        workDuration,
        breakDuration
    } = props;
    const { register, handleSubmit, errors } = useForm();

    // Generate Pomodoro Number options.
    const pomodoroNumList = [...Array(30).keys()].map((num, index) => {
        num = ++index;
        return (
            <option key={index}>{num}</option>
        );
    });

    // Generate Pomodoro Duration options.
    const pomodoroDurationList = [...Array(120).keys()].map((minute, index) => {
        minute = ++index;
        return (
            <option key={index}>{minute}</option>
        );
    });

    // Generate Break Duration options.
    const breakDurationList = [...Array(60).keys()].map((minute, index) => {
        minute = ++index;
        return (
            <option key={index}>{minute}</option>
        );
    });

    // Handle submit and build new task object to update state. Close page on submit.
    const onSubmit = taskSettings => {
        const newTask = {
            taskName : taskSettings.taskName,
            numOfPomodoros : parseInt(taskSettings.pomodoroNumber),
            workDuration : parseInt(taskSettings.pomodoroDuration),
            breakDuration : parseInt(taskSettings.breakDuration)
        }
        addNewTask(newTask);
        closeTaskPage();
    }

    return (
        <div className={`task-page container ${showTaskPage? 'show': ''}`}>
            <div className='task-page-header'>
                <button className='back-btn container' onClick={closeTaskPage}>
                    <IconContext.Provider value={{className: 'back-btn-icon'}} ><MdArrowBack /></IconContext.Provider>
                    <span>Back</span>
                </button>
                <h3>Task Settings</h3>
            </div>
            <form className='task-settings-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='input-container'>
                    <label htmlFor='taskName'>Task Name</label>
                    <input 
                        id='taskName' 
                        name='taskName' 
                        placeholder='What is your focus today?' 
                        type='text'
                        defaultValue={taskName}
                        onFocus={e => e.target.select()}
                        className='input-field' 
                        ref={register({maxLength:30})} />
                    {errors.taskName && <p className='error'>Please enter a shorter task name (max: 30 characters).</p>}
                </div>
                <div className='input-container'>
                    <label htmlFor='pomodoroNumber'>Pomodoro Number</label>
                    <select 
                        id='pomodoroNumber' 
                        name='pomodoroNumber' 
                        className='input-field' 
                        ref={register} 
                        defaultValue={numOfPomodoros} >
                        {pomodoroNumList}
                    </select>
                </div>
                <div className='input-container'>
                    <label htmlFor='pomodoroDuration'>Pomodoro Duration (minutes)</label>
                    <select 
                        id='pomodoroDuration' 
                        name='pomodoroDuration' 
                        className='input-field' 
                        ref={register} 
                        defaultValue={workDuration}>
                        {pomodoroDurationList}
                    </select>
                </div>
                <div className='input-container'>
                    <label htmlFor='breakDuration'>Break Duration (minutes)</label>
                    <select 
                        id='breakDuration' 
                        name='breakDuration' 
                        className='input-field' 
                        ref={register} 
                        defaultValue={breakDuration} >
                        {breakDurationList}
                    </select>
                </div>
                <button className='submit-btn container'>
                    <span>Submit</span>
                    <IconContext.Provider value={{className: 'submit-btn-icon'}} ><MdCheck /></IconContext.Provider>
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        taskName: state.pomodoro.taskName,
        numOfPomodoros: state.pomodoro.numOfPomodoros,
        workDuration: state.pomodoro.workDuration,
        breakDuration: state.pomodoro.breakDuration
    }
}

export default connect(mapStateToProps)(Task);
