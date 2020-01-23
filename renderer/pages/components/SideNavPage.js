import React from "react";

const Item = () => {
  const context = React.useContext(NavContext);
  return (
    <div style={{ color: context.selected: 'pink': 'inherit'}}>{ props.children }</div>
  )
}

const SideNavPage = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default SideNavPage;
