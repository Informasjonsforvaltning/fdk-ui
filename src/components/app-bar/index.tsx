import OrgLogo from '../org-logo';
import styles from './styles.module.scss';

const AppBar = () => {
    return (
        <div className={styles.appBar}>
            <OrgLogo />
        </div>
    );
};

export default AppBar;