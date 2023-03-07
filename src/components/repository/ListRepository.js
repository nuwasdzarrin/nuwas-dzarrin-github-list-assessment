import styles from "@/styles/Repository.module.css";
import Skeleton from "@/components/core/skeleton";
import {ToastContainer} from "react-nextjs-toast";
import {connect} from "react-redux";

const convertLangToColor = (lang) => {
    if (lang === 'PHP') return '#4F5D95'
    if (lang === 'Java') return '#b07219'
    if (lang === 'JavaScript') return '#f1e05a'
    if (lang === 'TypeScript') return '#3178c6'
    if (lang === 'Python') return '#3572A5'
    if (lang === 'Pascal') return '#E3F171'
    if (lang === 'CSS') return '#563d7c'
    if (lang === 'Dart') return '#00B4AB'
    if (lang === 'Vue') return '#41b883'
    if (lang === 'HTML') return '#e34c26'
    if (lang === 'Astro') return '#ff5a03'
    if (lang === 'Ruby') return '#701516'
    if (lang === 'C') return '#555555'
    if (lang === 'C++') return '#f34b7d'
    if (lang === 'C#') return '#178600'
    return 'white'
}
const dateFormat = (date) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = new Date(date)
    let day = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${month} ${day}, ${year}`
}
const RepositoryItem = (props) => {
    let repo = props.repo
    return (
        <div className={styles.card}>
            <div>
                <a href={repo.html_url} target="_blank">
                    <div className={styles.repoName}>{repo.name}</div>
                </a>
                <p>{repo.description || '-'}</p>
            </div>
            <div className={styles.flexCenterBetween}>
                {
                    repo.language ?
                        <div className={styles.flexCenter}>
                            <div className={styles.langLogo}
                                 style={{backgroundColor: convertLangToColor(repo.language)}}></div>
                            <div className={styles.repoLang}>{repo.language}</div>
                        </div> :
                        <div></div>
                }
                <div className={styles.repoLang}>Updated on {dateFormat(repo.updated_at)}</div>
            </div>
        </div>
    )

}
const ListRepository = (props) => {
    return (
        <>
            <div className={`${styles.grid}`}>
                {
                    props.loading ?
                        ['','',''].map(() =>
                            <div className={'mx-15'}>
                                <Skeleton width={'inherit'} height={300}/>
                            </div>
                        ) :
                        props.repositories.length > 0 && props.repositories.map((repo, key) =>
                            <RepositoryItem repo={repo} key={key}/>
                        )
                }
            </div>
            {
                !props.loading && props.repositories.length === 0 && <div className={styles.dataNotFound}> Data not found</div>
            }
            <ToastContainer />
        </>
    )
}

const mapStateToProps = (state) => ({
    repositories: state.repo.repositories,
    loading: state.repo.loading,
})

export default connect(mapStateToProps)(ListRepository)