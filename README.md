# ![Tri-Timer logo](public/favicon.ico) Tri-Timer
###### A three-in-one timer app built with React and Redux.

Designed as an all-inclusive timer app, this project comprises standard clock, stopwatch, and pomodoro timer functionality. It consists of a straightforward interface for selecting a timer widget, which loads in the main screen. In the case of the stopwatch and pomodoro timer, an extra set of controls is rendered. Each widget is built as a separate React component with its own state. State management is maintained with Redux.

### Clock
Simulating a traditional analogue clock, this widget displays the (device's) current time, day and date.

### Stopwatch
A timing widget which indicates elapsed time both in analogue and digital format. Includes buttons to start/pause, reset, and also record laps.

### Pomodoro Timer
A customisable timer based on the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) for optimising work efficiency and time management. In addition to start/pause and reset buttons, there is also a task button which brings up a settings panel for specifying task name, pomodoro number, and pomodoro/break durations. An alarm notifies the user when the timer reaches zero.
