import { mapGetters, mapMutations } from 'vuex'
const BASE_URL = 'http://192.168.29.205:808/SHFBM/project/mobile/'

export default {
    a: function() {
        let a = mapGetters([
            'user'
        ])
        console.log(a['user']())
    }
}