import Head from 'next/head'
import styles from '@/styles/Repository.module.css'
import { connect } from 'react-redux'
import { setSearch, setRepositories, setLoading } from '@/redux/action/repo/action'
import {actionType} from "@/redux/action/repo/type";
import { toast, ToastContainer } from 'react-nextjs-toast'
import Api from '@/utils/api'
import Skeleton from "@/components/skeleton";
const Repositories = (props) => {
    const onSearch = (event) => {
        props.setSearch(event.target.value)
    }
    const fetchRepository = async () => {
        try {
            props.setLoading(true)
            let res = await Api.repos.list(props.username,{})
            if (res.status === 200) {
                props.setRepositories(res.data)
            }
        } catch (e) {
            props.setRepositories([])
            showErrorNotify(e.response.data.message)
            throw e
        } finally {
            props.setLoading(false)
        }
    }
    const convertLangToColor = (lang) => {
      if (lang === 'PHP') return '#4F5D95'
      if (lang === 'JavaScript') return '#f1e05a'
      if (lang === 'Python') return '#3572A5'
      if (lang === 'CSS') return '#563d7c'
      if (lang === 'Dart') return '#00B4AB'
      if (lang === 'Vue') return '#41b883'
      if (lang === 'HTML') return '#e34c26'
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
    const showErrorNotify = (message) => {
        toast.notify(`Username ${message}`, {
            duration: 10,
            type: "error",
            title: "Fail"
        })
    }
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h2 className={styles.title}>List Repositories</h2>
                <div>
                    <input type="text" placeholder="Type github username..." className={styles.formSearchInput}
                           onChange={onSearch}/>
                    <button className={styles.buttonSearch} onClick={fetchRepository}>Search</button>
                </div>
                <div className={styles.space}></div>
                <div className={`${styles.grid}`}>
                    {
                        props.loading ?
                            ['','',''].map(() =>
                                <div className={'mx-15'}>
                                    <Skeleton width={'inherit'} height={300}/>
                                </div>
                            ) : props.repositories.length > 0 && props.repositories.map((repo, key) =>
                                <div className={styles.card} key={key}>
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
                </div>
                {
                    !props.loading && props.repositories.length === 0 && <div className={styles.dataNotFound}> Data not found</div>
                }
                <ToastContainer />
            </main>
        </>
    )
}

const mapStateToProps = (state) => ({
    username: state.repo.search,
    repositories: state.repo.repositories,
    loading: state.repo.loading,
})

const mapDispatchToProps = (dispatch) => ({
    setSearch: (search) => dispatch(setSearch(actionType.setSearch, { search: search })),
    setRepositories: (data) => dispatch(setRepositories(actionType.setRepo, { repositories: data })),
    setLoading: (data) => dispatch(setLoading(actionType.setLoading, { loading: data }))
})
export default connect(mapStateToProps, mapDispatchToProps)(Repositories)