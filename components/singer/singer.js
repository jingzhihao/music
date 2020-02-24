// components/singer/singer.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        },
        limit: {
            type: Number,
            value: 0
        }

    },
    //引入公共的样式
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //计算下拉加载时展示的数据
        limit() {
            //console.log(321);
            this.properties.limit += 30
            this.setData({
                limit: this.properties.limit
            })
            this.triggerEvent('limit', this.properties.limit)
                //console.log(this.properties.limit);
        }
    }
})