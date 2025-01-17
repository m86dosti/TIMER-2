const TimerChar = (props) => {
    const ref = React.useRef(null);
    const colon = props.char === ":";
    if (colon) {
      return /*#__PURE__*/React.createElement("h1", { className: "timer-char colon" }, ":");
    }
    const number = parseInt(props.char);
    const getCharSlider = () => {
      let options = [];
      for (let i = 0; i <= 9; i++) {
        const classes = classNames("timer-char-slider-option", {
          active: number === i
        });
        options.push( /*#__PURE__*/React.createElement("span", { key: i, className: classes }, i));
      }
      const height = ref.current ? ref.current.offsetHeight : 0, top = `${number * height * -1}px`;
      return ( /*#__PURE__*/React.createElement("div", { className: "timer-char-slider", style: { top } }, options));
    };
    return ( /*#__PURE__*/React.createElement("div", { ref: ref, className: "timer-char number" }, getCharSlider()));
  };
  const Timer = () => {
    const [date, setDateTo] = React.useState(new Date());
    React.useEffect(() => {
      const interval = setInterval(() => {
        const update = new Date();
        if (update.getSeconds() !== date.getSeconds()) {
          setDateTo(update);
        }
      }, 100);
      return () => {
        clearInterval(interval);
      };
    }, [date]);
    const formatSegment = (segment) => {
      return segment < 10 ? `0${segment}` : segment;
    };
    const getHours = (hours) => {
      return hours % 12 === 0 ? 12 : hours % 12;
    };
    const getTime = () => {
      const hours = getHours(date.getHours()), minutes = date.getMinutes(), seconds = date.getSeconds();
      return `${formatSegment(hours)}:${formatSegment(minutes)}:${formatSegment(seconds)}`;
    };
    const getChars = () => {
      return getTime().split("").map((char, index) => ( /*#__PURE__*/React.createElement(TimerChar, { key: index, char: char })));
    };
    return ( /*#__PURE__*/React.createElement("div", { id: "timer" }, /*#__PURE__*/React.createElement("div", { id: "timer-text" }, getChars())));
  };
  const App = () => {
    return ( /*#__PURE__*/React.createElement("div", { id: "app" }, /*#__PURE__*/React.createElement(Timer, null)));
  };
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));
  