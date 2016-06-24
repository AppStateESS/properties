var Modal = React.createClass({
    displayName: "Modal",

    getInitialState: function () {
        return { header: null, body: null, footer: null };
    },

    getDefaultProps: function () {
        return { header: null, body: null, footer: null, modalId: 'reactModal' };
    },

    render: function () {
        return React.createElement(
            "div",
            { id: this.props.modalId, className: "modal fade", tabindex: "-1", role: "dialog" },
            React.createElement(
                "div",
                { className: "modal-dialog" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "modal-header" },
                        React.createElement(
                            "button",
                            { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "×"
                            )
                        ),
                        React.createElement(
                            "h4",
                            { className: "modal-title" },
                            this.props.header
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        this.props.body
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-footer" },
                        this.props.footer,
                        React.createElement(
                            "button",
                            { type: "button", className: "btn btn-default", "data-dismiss": "modal" },
                            "Close"
                        )
                    )
                )
            )
        );
    }
});