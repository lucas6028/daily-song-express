import styles from './PlayButton.module.css';

function PlayButton() {
    return (
        /* From Uiverse.io by Na3ar-17 */
        <div className={styles.container}>
            <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}>
                    <span className={styles.title}>Play</span>
                    <span className={styles.ball}>
                        <span className={styles.icon}>
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 18V6l8 6-8 6Z"
                                ></path>
                            </svg>
                        </span>
                    </span>
                </span>
            </label>
        </div>
    )
}

export default PlayButton