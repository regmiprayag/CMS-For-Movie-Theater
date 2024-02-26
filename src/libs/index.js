export const setInForm = (event, state, setState) => {
  console.log(event.target.value);
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

