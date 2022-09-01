import { useNavigate} from 'react-router-dom';
import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles.jsx'

const DirectoryItem = ({category:{title, imageUrl, route}}) => {

    const navigate = useNavigate();
    const onNavigateHandler  = () => navigate(route);

    return(
    <DirectoryItemContainer>
        <BackgroundImage imageUrl={imageUrl}/>
        <Body onClick={onNavigateHandler}>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </Body>
    </DirectoryItemContainer>
    )
}

export default DirectoryItem;