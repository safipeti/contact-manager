export const inputHandler = {

    methods: {

        removeInput: function(i, dataGroup){
            this.contact[dataGroup].splice(i++, 1)
        },

        addInput: function (i, dataGroup, targetProp) {
            if (this.contact[dataGroup][i].targetProp !== "") {
                if (this.contact[dataGroup].length < i + 2) {
                    const data = {}
                    data.type = dataGroup == 'phones' ? 'mobile' : 'private'
                    data[targetProp] = null
                    this.contact[dataGroup].push(data);
                }
            } else {
                this.removeInput(i, dataGroup, targetProp);
            }
        },

        del: function (i, dataGroup, targetProp){
            if (this.contact[dataGroup][i][targetProp] == '') {
                this.removeInput(i, dataGroup, targetProp)
            }
        },

        phone(idx){
            if (idx && this.contacts[idx].phones[0]) {
                return this.contacts[idx].phones[0].phoneNumber
            }
            return null
        },

        email(idx){
            if (idx && this.contacts[idx].emails[0]) {
                return this.contacts[idx].emails[0].emailAddress
            }
            return null
        }
    }
}