import searchIcon from "../../assets/search.svg";
import "./SidebarHeader.css";
import profilePic from "../../assets/profile-pic.webp";

function SidebarHeader() {
  return (
    <nav className="navigation-container">
      <div className="profile-section">
        <img alt="profilePic" className="profile-picture" src={profilePic} />
        <div className="profile-name">Aadarsh</div>
      </div>
      <img alt="search" className="search-icon" src={searchIcon} />
    </nav>
  );
}

export default SidebarHeader;
