import store from "@/redux/store";


declare global {
    // redux store types for react-redux
    type RootState = ReturnType<typeof store.getState>
    type AppDispatch = typeof store.dispatch

    type IMG = {
        src?: string,
        alt?: string,
        error?: string
    }

    // slice types
    interface Project {
        id: string,
        created_at: string,
        html_url?: string,
        language: string,
        name: string,
        description: string,
        github: string,
        highlightImage: IMG,
        images: IMG[],
        skills: Skill[]
    }

    interface Experience {
        company: {
            name: string,
            logo?: {
                src: IMG,
                tooltip: string
            },
            url?: string,
            location: string
        },
        date: {
            start: string
            end: string
        },
        description: string,
        position: string,
        skills: Skill[]
    }

    interface Education {
        date: string,
        degree: string,
        description: string,
        gpa: string,
        school: string,
        skills: Skill[]
    }

    // route types
    type Route = "home" | "projects" | "about" | "contact" | "resume" | "project" | "experience" | "flappy-bird"

    // skills
    type Skill =
        'ABLETON' |
        'ACTIVITY_PUB' |
        'ACTIX' |
        'ADONIS' |
        'AFTER_EFFECTS' |
        'AI_SCRIPT' |
        'ALPINE_JS' |
        'ANDROID_STUDIO' |
        'ANGULAR' |
        'ANSIBLE' |
        'APOLLO' |
        'APPWRITE' |
        'ARDUINO' |
        'ASTRO' |
        'ATOM' |
        'AUDITION' |
        'AUTO_CAD' |
        'AWS' |
        'AZUL' |
        'AZURE' |
        'BABEL' |
        'BASH' |
        'BEVY' |
        'BLENDER' |
        'BOOTSTRAP' |
        'BSD' |
        'C' |
        'CASSANDRA' |
        'CLOJURE' |
        'CLOUDFLARE' |
        'CMAKE' |
        'CODE_PEN' |
        'COFFEE_SCRIPT' |
        'CPP' |
        'CRYSTAL' |
        'CS' |
        'CSS' |
        'D3' |
        'DART' |
        'DENO' |
        'DEV_TO' |
        'DISCORD' |
        'DISCORD_BOTS' |
        'DJANGO' |
        'DOCKER' |
        'DOT_NET' |
        'DYNAMO_DB' |
        'ECLIPSE' |
        'ELECTRON' |
        'ELIXIR' |
        'EMACS' |
        'EMBER' |
        'EMOTION' |
        'EXPRESS_JS' |
        'FAST_API' |
        'FEDIVERSE' |
        'FIGMA' |
        'FIREBASE' |
        'FLASK' |
        'FLUTTER' |
        'FORTH' |
        'FORTRAN' |
        'GAME_MAKER_STUDIO' |
        'GATSBY' |
        'GCP' |
        'GHERKIN' |
        'GIT' |
        'GITHUB' |
        'GITHUB_ACTIONS' |
        'GIT_LAB' |
        'GODOT' |
        'GO_LANG' |
        'GRADLE' |
        'GRAFANA' |
        'GRAPH_QL' |
        'GTK' |
        'GULP' |
        'HASKELL' |
        'HAXE' |
        'HAXE_FLIXEL' |
        'HEROKU' |
        'HIBERNATE' |
        'HTML' |
        'IDEA' |
        'ILLUSTRATOR' |
        'INSTAGRAM' |
        'IPFS' |
        'JAVA' |
        'JAVA_SCRIPT' |
        'JENKINS' |
        'JEST' |
        'JQUERY' |
        'JULIA' |
        'KAFKA' |
        'KOTLIN' |
        'KTOR' |
        'KUBERNETES' |
        'LARAVEL' |
        'LATEX' |
        'LINKED_IN' |
        'LINUX' |
        'LIT' |
        'LUA' |
        'MARKDOWN' |
        'MASTODON' |
        'MATERIAL_UI' |
        'MATLAB' |
        'MAVEN' |
        'MISSKEY' |
        'MONGO_DB' |
        'MY_SQL' |
        'NEO_VIM' |
        'NEST_JS' |
        'NETLIFY' |
        'NEXT_JS' |
        'NGINX' |
        'NIM' |
        'NODE_JS' |
        'NUXT_JS' |
        'OCAML' |
        'OCTAVE' |
        'OPEN_SHIFT' |
        'OPEN_STACK' |
        'PERL' |
        'PHOTOSHOP' |
        'PHP' |
        'PLAN9' |
        'PLANET_SCALE' |
        'POSTGRE_SQL' |
        'POSTMAN' |
        'POWERSHELL' |
        'PREMIERE' |
        'PRISMA' |
        'PROCESSING' |
        'PROMETHEUS' |
        'PUG' |
        'PYTHON' |
        'PY_TORCH' |
        'QT' |
        'R' |
        'RABBIT_MQ' |
        'RAILS' |
        'RASPBERRY_PI' |
        'REACT' |
        'REACTIVE_X' |
        'REDIS' |
        'REDUX' |
        'REGEX' |
        'REMIX' |
        'REPLIT' |
        'ROCKET' |
        'ROLLUP_JS' |
        'ROS' |
        'RUBY' |
        'RUST' |
        'SASS' |
        'SCALA' |
        'SELENIUM' |
        'SENTRY' |
        'SEQUELIZE' |
        'SKETCHUP' |
        'SOLIDITY' |
        'SOLID_JS' |
        'SPRING' |
        'SQLITE' |
        'STACK_OVERFLOW' |
        'STYLED_COMPONENTS' |
        'SUPABASE' |
        'SVELTE' |
        'SVG' |
        'SWIFT' |
        'SYMFONY' |
        'TAILWIND_CSS' |
        'TAURI' |
        'TENSOR_FLOW' |
        'THREE_JS' |
        'TWITTER' |
        'TYPE_SCRIPT' |
        'UNITY' |
        'UNREAL_ENGINE' |
        'V' |
        'VALA' |
        'VERCEL' |
        'VIM' |
        'VISUAL_STUDIO' |
        'VITE' |
        'VS_CODE' |
        'VUE_JS' |
        'WEB_ASSEMBLY' |
        'WEBFLOW' |
        'WEBPACK' |
        'WINDI_CSS' |
        'WORDPRESS' |
        'WORKERS' |
        'XD' |
        'ZIG' |
        "FRAMER_MOTION" |
        "SOCKET_IO" |
        "REST" |
        "MULTITHREADING" |
        "CONCURRENCY" |
        "ALGORITHMS" |
        "DATA_STRUCTURES" |
        "DATA_ANALYSIS" |
        "DATA_SCIENCE" |
        "DATA_VISUALIZATION" |
        "MACHINE_LEARNING" |
        "NEURAL_NETWORKS"
}